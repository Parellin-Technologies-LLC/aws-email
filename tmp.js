const x = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const y = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

console.log( x );

console.log( y );

