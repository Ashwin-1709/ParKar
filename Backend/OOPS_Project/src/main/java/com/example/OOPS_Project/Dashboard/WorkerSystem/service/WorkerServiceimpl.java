package com.example.OOPS_Project.Dashboard.WorkerSystem.service;

import com.example.OOPS_Project.Dashboard.Dao.DateTimeRepository;
import com.example.OOPS_Project.Dashboard.Database.DateTime;
import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.Service;
import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.ServiceWork;
import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.Worker;
import com.example.OOPS_Project.Dashboard.WorkerSystem.model.AssignServiceDetail;
import com.example.OOPS_Project.Dashboard.WorkerSystem.repository.ServiceRepository;
import com.example.OOPS_Project.Dashboard.WorkerSystem.repository.ServiceWorkerRepository;
import com.example.OOPS_Project.Dashboard.WorkerSystem.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


@org.springframework.stereotype.Service
public class WorkerServiceimpl implements WorkerService {

    @Autowired
    private WorkerRepository workerrepository;

    @Autowired
    private DateTimeRepository dateTimeRepository;

    @Autowired
    private ServiceRepository servicerepository;

    @Autowired
    ServiceWorkerRepository serviceWorkerRepository;

    @Override
    public Worker saveworker(Worker worker)
    {
        serviceWorkerRepository.save(new ServiceWork(worker));
        return workerrepository.save(worker);
    }



    @Override
    public List<Worker> getAllworkers() {
        return workerrepository.findAll();
    }

    @Override
    public Worker get(Integer id){
        return workerrepository.findById(id).get();
    }

    @Override
    public void delete(Integer id){
        workerrepository.deleteById(id);
    }

    @Override
    public void work(AssignServiceDetail assignServiceDetail){
        int minn = 1000;
        Worker worker1=new Worker();
        List<Worker>workers = workerrepository.getAllByParkingSpace(assignServiceDetail.getConfirmBookInfo().getParkingSpace());
        for (Worker worker:workers){
            List<Service>services = worker.getServices();

            if (services.size()<minn){
                minn=services.size();
                worker1=worker;
            }
        }
        Worker worker = workerrepository.getWorkerById(worker1.getId());
        List<Service>services=worker.getServices();
        List<DateTime> dateTimes = worker.getDateTimes();
        services.addAll(assignServiceDetail.getServices());
        DateTime dateTime = new DateTime(assignServiceDetail.getConfirmBookInfo().getDateTimeModel().getInTime(),
                assignServiceDetail.getConfirmBookInfo().getDateTimeModel().getOutTime());
        DateTime dateTime1 = dateTimeRepository.findDateTimeByInTimeAndOutTime(dateTime.getInTime(),dateTime.getOutTime()).get(0);
        dateTimes.add(dateTime);
        for(Service service:services)
        {
            Service service1 = servicerepository.getServiceById(service.getId());
            serviceWorkerRepository.save(new ServiceWork(service1,worker,dateTime));
            List<ServiceWork> serviceWorks = serviceWorkerRepository.getServiceWorkByWorker(worker);
            if(serviceWorks.get(0).getService()==null) serviceWorkerRepository.delete(serviceWorks.get(0));
        }
        workerrepository.save(worker);
    }

    public List<ServiceWork> getAllWork()
    {
        return serviceWorkerRepository.findAll();
    }

    public List<Service> getAllServices() {
        return servicerepository.findAll();
    }

}
