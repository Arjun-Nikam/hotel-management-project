package com.HotelManagment.DBSProject.repository;

import com.HotelManagment.DBSProject.entity.HotelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface HotelRepository extends JpaRepository<HotelEntity,Long> {


}
