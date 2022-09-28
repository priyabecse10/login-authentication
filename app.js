const fastify=require('fastify')({logger:true});

//require our routes into the appication
require('./server/routes')(fastify);
fastify.get('*',(req,res)=>{
    res.status(200).send({
        message:"hello world",});
});

const start=async()=>{
    try{
        await fastify.listen({port:8000});
    }catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
};
start();