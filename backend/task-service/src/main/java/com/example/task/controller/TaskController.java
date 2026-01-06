package com.example.task.controller;

import org.springframework.web.bind.annotation.*;

import com.example.task.dto.ApiResponse;
import com.example.task.model.Task;
import com.example.task.service.TaskService;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class TaskController {
	private final TaskService taskService;

	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}

	@GetMapping
	public ApiResponse<List<Task>> getAllTasks() {
		return taskService.getAllTasks();
	}

	@PostMapping
	public ApiResponse<Task> createTask(@RequestBody Task task) {
		return taskService.createTask(task);
	}

	@GetMapping("/user/{userId}")
	public ApiResponse<List<Task>> getTasksByUser(@PathVariable Long userId) {
		return taskService.getTasksByUser(userId);
	}

	@PutMapping("/{taskId}")
	public ApiResponse<Task> updateTask(@PathVariable Long taskId, @RequestBody Task task) {
		return taskService.updateTask(taskId, task);
	}

	@DeleteMapping("/{taskId}")
	public ApiResponse<Task> deleteTask(@PathVariable Long taskId) {
		return taskService.deleteTask(taskId);
	}
}
