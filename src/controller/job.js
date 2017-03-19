import mongoose   from 'mongoose';
import { Router } from 'express';
import Job        from '../models/job';

export default({config, db}) => {
  let api = Router();

  //CRUD - Creaate Read Update Delete

  //'/v1/job/add' - create
  api.post('/add', (req, res) => {
    let newJob = new Job();
    newJob.title = req.body.title;

    newJob.save(err =>{
      if(err) {
        res.send(err);
      }
      //notify the client that the job was saved successfully
      res.json({message: 'Job saved successfully'});
    });
  });

  //'v1/job' - Read
  api.get('/', (req, res) => {
    //empty {} = return all
    Job.find({}, (err, jobs) => {
      if(err) {
        res.send(err);
      }
      //send back all jobs found
      res.json(jobs);
    });
  });

  //'v1/job/:id' - Read id
  api.get('/:id', (req, res) => {
    Job.findById(req.params.id, (err, job) =>{
      if(err) {
        res.send(err);
      }
      //send back the found job
      res.json(job);
    });
  });

  //'v1/job/:id' - Update
  api.put('/:id', (req, res) => {
    Job.findById(req.params.id, (err, job) => {
      if(err) {
        res.send(err);
      }

      job.title = req.body.title;
      job.save(err => {
        if(err) {
          res.send(err);
        }
        //send back a job updated success message
        res.json({message: "Job info updated!"});
      });
    });
  });

  //'v1/job/:id' - Delete
  api.delete("/:id", (req, res) => {
    Job.remove({
        _id: req.params.id
    }, (err, job) => {
      if(err) {
        res.send(err);
      }
      //send back a job deleted success message
      res.json({message: "Job successfully removed!"});
    });
  });

  return api;
}
