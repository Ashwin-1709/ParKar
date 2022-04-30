package com.example.OOPS_Project.Dashboard.WorkerSystem.controller;

import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.ServiceWork;
import com.example.OOPS_Project.Dashboard.WorkerSystem.dto.ServiceRequest;
import com.example.OOPS_Project.Dashboard.WorkerSystem.dto.ServiceResponse;
import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.Service;
import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.Worker;
import com.example.OOPS_Project.Dashboard.WorkerSystem.model.AssignServiceDetail;
import com.example.OOPS_Project.Dashboard.WorkerSystem.repository.ServiceRepository;
import com.example.OOPS_Project.Dashboard.WorkerSystem.repository.ServiceWorkerRepository;
import com.example.OOPS_Project.Dashboard.WorkerSystem.repository.WorkerRepository;
import com.example.OOPS_Project.Dashboard.WorkerSystem.service.WorkerServiceimpl;
import com.example.OOPS_Project.Registeration.RegistrationRequest;
import com.example.OOPS_Project.Registeration.RegistrationService;
import com.example.OOPS_Project.UserApp.AppUser;
import com.example.OOPS_Project.UserApp.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/worker")
@CrossOrigin
public class WorkerController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private WorkerRepository workerrepository;

    @Autowired
    private ServiceRepository servicerepository;

    @Autowired
    private WorkerServiceimpl workerservice;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    ServiceWorkerRepository serviceWorkerRepository;


    @PostMapping("/placeservice")
    public Worker placeservice(@RequestBody ServiceRequest request){
        return workerrepository.save(request.getWorker());
    }

    @PostMapping("/add")
    public String add(@RequestBody Worker worker){

        workerservice.saveworker(worker);
        RegistrationRequest request = new RegistrationRequest(
                worker.getName(),
                null,
                null,
                worker.getMail(),
                worker.getPassword(),
                null,
                null,
                null
        );
        registrationService.addWorker(request);
        return "New worker is added";
    }

    @PostMapping("/addservice")
    public String addservice(@RequestBody Service service){
        servicerepository.save(service);
        return "New service is added";
    }

    @GetMapping("/getinfo")
    public List<ServiceResponse>getJoinInformation(){
        return workerrepository.getJoinInformation();
    }

    @GetMapping("/findallservice")
    public List<Service> findallservice(){
        return servicerepository.findAll();
    }

    @GetMapping("/getAll")
    public List<Worker> getAllworkers(){
        return workerrepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Worker> get(@PathVariable Integer id){
        try {
            Worker worker = workerservice.getAllworkers().get(id);
            return new ResponseEntity<Worker>(worker,HttpStatus.OK);

        }
        catch (NoSuchElementException e){
            return new ResponseEntity<Worker>(HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/{id}")
    public ResponseEntity<Worker> update(@RequestBody Worker worker, @PathVariable Integer id){
        try {
            Worker existingworker = workerservice.get(id);
            workerservice.saveworker(worker);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (NoSuchElementException e){
            return new ResponseEntity<Worker>(HttpStatus.NOT_FOUND);

        }
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){
        Worker worker = workerrepository.getWorkerById(id);
        List<ServiceWork> serviceWorks = serviceWorkerRepository.getServiceWorkByWorker(worker);

        AppUser appUser = userRepository.findByMail(worker.getMail());
//        workerservice.delete(id);
        userRepository.delete(appUser);

        serviceWorkerRepository.deleteAll(serviceWorks);
        return "worker deleted";
    }

    @PostMapping("/assignwork")
    public String assignwork(@RequestBody AssignServiceDetail assignServiceDetail){
        workerservice.work(assignServiceDetail);
        return "New WOrk Given";
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<ServiceWork>> getWorker(@PathVariable String name)
    {
        return ResponseEntity.ok(serviceWorkerRepository.getServiceWorkByWorker(workerrepository.getWorkerByName(name)));
    }

    @GetMapping("/allWork")
    public List<ServiceWork> allWork()
    {
        return workerservice.getAllWork();
    }

    @GetMapping("/getAllServices")
    public List<Service> Services()
    {
        return workerservice.getAllServices();
    }

}
