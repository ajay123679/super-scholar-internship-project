const counterSchema={
    id:{
        type:String
    },
    seq:{
        type:Number
    }
}
const countermodel=new mongoose.model("counter",counterSchema)
module.exports=counterSchema
