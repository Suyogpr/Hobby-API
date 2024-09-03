import Fact from "../models/fact.model.js";
import express from "express";


const router = express.Router({mergeParams:true});

//Add a fact

router.post('/', async (req, res) => {
    try {
        const fact = new Fact({
            fact: req.body.fact,
            activity: req.params.activityId,
        });
        await fact.save();
        res.status(201).json(fact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//List all facts

router.get('/', async(req,res) =>{
    try{
        const {activityId} = req.params;
        const facts = await Fact.find({activity:activityId});
        res.status(200).json(facts);
    }catch(error){
        res.status(500).json({message:error.message})
    }
});


//Edit a fact 

router.put('/',async(req,res) =>{
    try{
        const {factId} = req.params;
        const updatedFact = await Fact.findByIdAndUpdate(factId,req.body,{ new:true });
        if(!updatedFact)
            return res.status(404).json({message:'Fact not found.'})
    }catch(error){
        res.status(400).json({message:error.message})
    }
});

//Delete a fact

router.delete('/', async(req,res) =>{
    try{
        const {factId} = req.params;
        const result = await Fact.findByIdAndDelete(factId);
        if(!result)
            return res.status(404),json({message:'Fact not Found'});
        res.status(204).send()
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

export default router;