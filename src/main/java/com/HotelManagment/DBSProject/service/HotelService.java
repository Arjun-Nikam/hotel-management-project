package com.HotelManagment.DBSProject.service;

import com.HotelManagment.DBSProject.entity.HotelEntity;
import com.HotelManagment.DBSProject.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class HotelService {
    @Autowired
    private HotelRepository hotelRepository;


    public HotelEntity saveEntry(HotelEntity hotelEntity) {
        hotelRepository.save(hotelEntity);
        return hotelEntity;

    }


    public List<HotelEntity> printList() {
        return hotelRepository.findAll();
    }


    public Optional<HotelEntity> searchByAadhar(Long aadhar) {
        return hotelRepository.findById(aadhar);
    }

    public void remove(Long aadhar) {
        hotelRepository.deleteById(aadhar);
    }


}

