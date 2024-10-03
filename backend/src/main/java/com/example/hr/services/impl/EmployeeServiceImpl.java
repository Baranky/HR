package com.example.hr.services.impl;

import com.example.hr.dto.requests.EmployeeReq;
import com.example.hr.dto.responses.EmployeeRes;
import com.example.hr.entity.Employee;
import com.example.hr.repositories.EmployeeRepository;
import com.example.hr.services.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final  EmployeeRepository employeeRepository;
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    private final String uploadDir = "D:\\spring\\HR\\ProfilePhoto\\";

    /*
    @Override
    public String saveProfilePhoto(MultipartFile file) {
    try {
        // Dosya yolunu ve adını belirleyin
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);

        // Dosyayı belirlenen yola kopyalayın
        Files.copy(file.getInputStream(), filePath);
        return fileName;
    } catch (IOException e) {
        throw new RuntimeException("Profil fotoğrafı kaydedilemedi: " + e.getMessage());
      }
    }

    @Override
    public EmployeeRes createEmployee(EmployeeReq request,MultipartFile file) {
        Employee employee=mapToEmployee(request);
        if (file != null && !file.isEmpty()) {
            String fileName = saveProfilePhoto(file);
            employee.setProfilePhoto(fileName);
        }

            Employee newEmployee=employeeRepository.save(employee);
            return mapToResponse(newEmployee);

    }
    */

    //tum personelleri listeleme
    public List<EmployeeRes> getAllEmployee(){
        List<Employee> employeeList=employeeRepository.findAll();
        List<EmployeeRes> responseList=new ArrayList<>();
        for(Employee user:employeeList){
            responseList.add(mapToResponse(user));
        }
        return responseList;
    }

    //kaydetme
    @Override
    public EmployeeRes createEmployee(EmployeeReq request) {
        Employee employee=mapToEmployee(request);
        Employee newEmployee=employeeRepository.save(employee);
        return mapToResponse(newEmployee);
    }

    //silme
    @Override
    public void deleteEmployee(Long employeeId){
        employeeRepository.deleteById(Math.toIntExact(employeeId));
    }


    //id gore listleme
    public EmployeeRes getEmployeeById(Long employeId) throws Exception {
        Employee employee=employeeRepository.getReferenceById(Math.toIntExact(employeId));
        EmployeeRes employeeRes=mapToResponse(employee);
        return employeeRes;
    }

    //tc ve name gore arama
    @Override
    public List<EmployeeRes> searchEmployee(Long TCKN, String name) {
        List<Employee> employee= employeeRepository.searchByTcAndName(TCKN, name);
        return employee.stream().map(this::mapToResponse).collect(Collectors.toList());

    }

    //zimmet işlemleri icin kulanma
    @Override
    public Employee getById(Long id) {
        return employeeRepository.getReferenceById(Math.toIntExact(id));
    }

    //gunceleme
    @Override
    public EmployeeRes updateEmployee(Long id, EmployeeReq employeeReq) throws Exception {
        Employee existingEmployee = employeeRepository.findById(Math.toIntExact(id)).orElseThrow(() ->
             new Exception("Employee not found with id: " + id));
        // Mevcut çalışan nesnesini mapToEmployee kullanarak güncelleme
        Employee updatedEmployee = mapToEmployee(employeeReq);
        updatedEmployee.setId(existingEmployee.getId()); // Mevcut ID'yi koruyoruz
        Employee savedEmployee = employeeRepository.save(updatedEmployee);
        return mapToResponse(savedEmployee);
    }

    private EmployeeRes mapToResponse(Employee employee){
        EmployeeRes response=new EmployeeRes(
                employee.getName(),
                employee.getId(),
                employee.getSurname(),
                employee.getGender(),
                employee.getDateBirth(),
                employee.getMaritalStatus(),
                employee.getTCKN(),
                employee.getIsActive(),
                employee.getTask(),
                employee.getGraduationStatus(),
                employee.getTerminationDate(),
                employee.getUnits(),
                employee.getProfilePhoto()
        );
        return response;
    }

    private Employee mapToEmployee(EmployeeReq request){
        Employee employee=new Employee();
        employee.setName(request.name());
        employee.setSurname(request.surname());
        employee.setGender(request.gender());
        employee.setIsActive(request.isActive());
        employee.setMaritalStatus(request.maritalStatus());
        employee.setTCKN(request.TCKN());
        employee.setGraduationStatus(request.graduationStatus());
        employee.setDateBirth(request.dateBirth());
        employee.setProfilePhoto(request.profilePhoto());
        employee.setTask(request.task());
        employee.setUnits(request.units());
        employee.setTerminationDate(request.terminationDate());


        return employee;
    }



}
