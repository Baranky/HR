package com.example.hr.controller;

import com.example.hr.dto.requests.EmployeeReq;
import com.example.hr.dto.responses.EmployeeRes;
import com.example.hr.services.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeService){
        this.employeeService=employeService;

    }

    //kaydetme
    @PostMapping()
    public ResponseEntity<EmployeeRes> saveEmployee(@RequestBody EmployeeReq employeeReq){
        return new  ResponseEntity<>(employeeService.createEmployee(employeeReq), HttpStatus.CREATED);
    }

    /* profil fotosu da dahil kaydetme
    @PostMapping( consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EmployeeRes> createEmployee(@RequestPart("employee") EmployeeReq request,
                                                      @RequestPart("image") MultipartFile profilePhoto) {
        EmployeeRes response = employeeService.createEmployee(request, profilePhoto);
        return ResponseEntity.ok(response);
    }
    */


    //tum personeleri listeleme
    @GetMapping()
    public ResponseEntity<List<EmployeeRes>> getAllEmployee() {
        return new ResponseEntity<>(employeeService.getAllEmployee(), HttpStatus.OK);
    }


    //id gore sorgulama
    @GetMapping("{id}")
    public EmployeeRes getUserById(@PathVariable Long id) throws Exception {
        return  employeeService.getEmployeeById(id);
    }

    //arama
    @GetMapping("/search")
    public List<EmployeeRes> searchEmployees(
            @RequestParam(required = false) Long TCKN,
            @RequestParam(required = false) String name
    ) {
        return employeeService.searchEmployee(TCKN, name);
    }

    //silme
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //update
    @PutMapping("{id}")
    public ResponseEntity<EmployeeRes> updateEmployee(@PathVariable Long id,@RequestBody EmployeeReq employeeReq) throws Exception {
     return new ResponseEntity<>(employeeService.updateEmployee(id,employeeReq),HttpStatus.OK);
    }

}

