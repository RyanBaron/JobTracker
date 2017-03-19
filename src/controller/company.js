import mongoose   from 'mongoose';
import { Router } from 'express';
import Company    from '../models/company';
import Job        from '../models/job';

export default({config, db}) => {
  let api = Router();

  //CRUD - Creaate Read Update Delete

  //'/v1/company/add' - create
  api.post('/add', (req, res) => {
    let newCompany = new Company();

    newCompany.name     = req.body.name;
    newCompany.url      = req.body.url;
    newCompany.city     = req.body.city;
    newCompany.state    = req.body.state;
    newCompany.geometry.coordinates = req.body.geometry.coordinates;

    newCompany.save(err =>{
      if(err) {
        res.send(err);
      }
      //notify the client that the company was saved successfully
      res.json({message: 'Company saved successfully'});
    });
  });

  //'v1/company' - Read
  api.get('/', (req, res) => {
    //empty {} = return all
    Company.find({}, (err, companies) => {
      if(err) {
        res.send(err);
      }
      //send back all companies
      res.json(companies);
    });
  });

  //'v1/company/:id' - Read id
  api.get('/:id', (req, res) => {
    Company.findById(req.params.id, (err, company) =>{
      if(err) {
        res.send(err);
      }
      //send back the found comapny
      res.json(company);
    });
  });

  //'v1/company/:id' - Update
  api.put('/:id', (req, res) => {
    Company.findById(req.params.id, (err, company) => {
      if(err) {
        res.send(err);
      }

      company.title = req.body.name;
      company.save(err => {
        if(err) {
          res.send(err);
        }
        //send back a job updated success message
        res.json({message: "Company info updated!"});
      });
    });
  });

  //'v1/company/:id' - Delete
  api.delete("/:id", (req, res) => {
    Company.remove({
        _id: req.params.id
    }, (err, company) => {
      if(err) {
        res.send(err);
      }
      //send back a job deleted success message
      res.json({message: "Company successfully removed!"});
    });
  });

  //'/v1/company/job/add/:id' - create
  api.post('/job/add/:id', (req, res) => {
    Company.findById(req.params.id, (err, company) => {
      if(err){
        res.send(err);
      }
      console.log('here after the comapny found', company);
      let newJob  = new Job();
      //set the new job properties
      newJob.title    = req.body.title;
      newJob.url      = req.body.url;
      newJob.type     = req.body.type;
      newJob.pay      = req.body.pay;
      newJob.status   = req.body.status;
      newJob.company  = company._id;
      //save the new job
      newJob.save(err =>{
        if(err) {
          res.send(err);
        }
        company.jobs.push(newJob);
        company.save(err => {
          if(err) {
            res.send(err);
          }
          //notify the client that the company was saved successfully
          res.json({message: 'Company job saved'});
        });
      });
    });
  });

  return api;
}
