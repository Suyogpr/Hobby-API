import express from 'express';
import Activity from '../models/activity.model.js';
import Fact from '../models/fact.model.js';

const router = express.Router();

//Create new activity

router.post('/', async (req,res) =>{
    try{
        const activity = new Activity(req.body);
        await activity.save()
        res.status(201).json(activity)
    }catch(error){
        res.status(400).json({message:error.message})
    }
});

//List all activity

router.get('/', async (req,res)=>{
    try{
        const activities = await Activity.find().select('_id name');;
        res.status(200).json(activities)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//Delete activity

router.delete('/',async(req,res)=>{
    try{
        const {activityId} = req.params;
        await Fact.deleteMany({activity:activityId});
        await Activity.findByIdAndDelete(activityId);
        res.status(204).send();
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

export default router;