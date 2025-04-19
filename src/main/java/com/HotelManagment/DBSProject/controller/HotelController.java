package com.HotelManagment.DBSProject.controller;

import com.HotelManagment.DBSProject.entity.HotelEntity;
import com.HotelManagment.DBSProject.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hotel")
public class HotelController {

    @Autowired
    private HotelService hotelService;


    @GetMapping
    public List<HotelEntity> getlist(){
       return hotelService.printList();

    }

    @PostMapping
    public String enterdata(@RequestBody HotelEntity data){
        data.setFromDate(LocalDateTime.now());
        hotelService.saveEntry(data);
        return "Saved Sussesfully!";
    }

    @GetMapping("/aadhar/{aadhar}")
    public HotelEntity getInfoByAadhar(@PathVariable Long aadhar){
        return hotelService.searchByAadhar(aadhar).orElse(null);
    }

    @DeleteMapping("/delete/{aadhar}")
    public String delteByAadhar(@PathVariable Long aadhar){
        hotelService.remove(aadhar);
        return "removed!";
    }

    @PutMapping("/update/{aadhar}")
    public ResponseEntity<HotelEntity> updateById(
            @PathVariable Long aadhar,
            @RequestBody HotelEntity newEntry) {

        HotelEntity existingHotel = hotelService.searchByAadhar(aadhar).orElse(null);

        if (existingHotel != null) {
            existingHotel.setName(newEntry.getName());
            existingHotel.setEmail(newEntry.getEmail());
            existingHotel.setPhn(newEntry.getPhn());
            existingHotel.setRoomNo(newEntry.getRoomNo());
            existingHotel.setToDate(newEntry.getToDate());
            existingHotel.setPayment(newEntry.getPayment());
            existingHotel.setFromDate(newEntry.getFromDate()); // in case this is also needed

            HotelEntity updatedHotel = hotelService.saveEntry(existingHotel); // Save updated data
            return ResponseEntity.ok(updatedHotel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }





    }


















