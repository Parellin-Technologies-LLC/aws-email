/** ****************************************************************************************************
 * File: QueryBuilder.js
 * Project: aws-email
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 26-Apr-2019
 *******************************************************************************************************/
'use strict';

class QueryBuilder
{
	constructor( TableName, IndexName, ExclusiveStartKey, Limit = 1000 )
	{
		this.TableName = TableName;
		this.Limit     = Limit;

		if( IndexName ) {
			this.IndexName = IndexName;
		}

		if( ExclusiveStartKey ) {
			this.ExclusiveStartKey = ExclusiveStartKey;
		}

		this.KeyConditionExpression    = '';
		this.ExpressionAttributeNames  = {};
		this.ExpressionAttributeValues = {};

		Object.defineProperty( this, 'n', {
			configurable: false,
			enumerable: false,
			writable: true,
			value: {}
		} );
	}

	get and()
	{
		this.errorCheck( 'and' );
		this.KeyConditionExpression += ' AND ';
		return this;
	}

	get or()
	{
		this.errorCheck( 'or' );
		this.KeyConditionExpression += ' OR ';
		return this;
	}

	between( n1, n2 )
	{
		this.errorCheck( 'between' );

		const
			Sym1 = `:${ this.randomHex() }`,
			Sym2 = `:${ this.randomHex() }`;

		this.KeyConditionExpression += `${ this.n.kSym } BETWEEN ${ Sym1 } AND ${ Sym2 }`;
		this.ExpressionAttributeNames[ this.n.kSym ] = this.n.key;
		this.ExpressionAttributeValues[ Sym1 ]       = n1;
		this.ExpressionAttributeValues[ Sym2 ]       = n2;
		return this;
	}

	let( n )
	{
		this.errorCheck( 'let' );

		const
			Sym  = this.randomHex(),
			kSym = `#${ Sym }`,
			vSym = `:${ Sym }`;

		this.n = { Sym, kSym, vSym, key: n, str: '' };
		return this;
	}

	equal( n )
	{
		this.errorCheck( 'equal' );

		this.n.value = n;

		this.KeyConditionExpression += `${ this.n.kSym } = ${ this.n.vSym }`;
		this.ExpressionAttributeNames[ this.n.kSym ]  = this.n.key;
		this.ExpressionAttributeValues[ this.n.vSym ] = this.n.value;
		return this;
	}

	gt( n )
	{
		this.errorCheck( 'gt' );

		this.n.value = n;

		this.KeyConditionExpression += `${ this.n.kSym } < ${ this.n.vSym }`;
		this.ExpressionAttributeNames[ this.n.kSym ]  = this.n.key;
		this.ExpressionAttributeValues[ this.n.vSym ] = this.n.value;
		return this;
	}

	toObject()
	{
		return this;
	}

	isEmpty( o )
	{
		return !Object.keys( o ).length;
	}

	randomHex()
	{
		return ( Math.random() * 0xFFFFFF << 0 ).toString( 16 );
	}

	hasSome( o, ...args )
	{
		return !!( args.filter( i => o.hasOwnProperty( i ) ).length );
	}

	errorCheck( fn )
	{
		if( fn === 'let' ) {
			this.errorNotAfterComparison( fn );
		} else if( this.hasSome( fn, 'equal', 'gt', 'and', 'or', 'between' ) ) {
			this.errorComparisonBeforeDeclaration( fn );
		}
	}

	errorComparisonBeforeDeclaration( fn )
	{
		if( this.isEmpty( this.n ) ) {
			throw new TypeError( `Comparison [${ fn }] must come after let() declaration` );
		}
	}

	errorNotAfterComparison( fn )
	{
		if( this.KeyConditionExpression && !this.KeyConditionExpression.endsWith( ' ' ) ) {
			throw new TypeError( `Operation [${ fn }] must be after comparison [and | or]` );
		}
	}
}

QueryBuilder.EQ  = '=';
QueryBuilder.GT  = '<';
QueryBuilder.GTE = '<=';
QueryBuilder.LT  = '>';
QueryBuilder.LTE = '>=';
QueryBuilder.AND = 'AND';
QueryBuilder.BT  = 'BETWEEN';
QueryBuilder.BW  = ( a, sub ) => `begins_with(${ a }, ${ sub })`;

module.exports = QueryBuilder;
