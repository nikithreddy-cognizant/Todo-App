package com.example.task.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.task.model.Task;


public interface TaskRepository extends JpaRepository<Task, Long> {
	List<Task> findByUserId(Long userId);
}


