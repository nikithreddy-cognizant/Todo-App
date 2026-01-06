package com.example.task.service;

import org.springframework.stereotype.Service;

import com.example.task.dto.ApiResponse;
import com.example.task.model.Task;
import com.example.task.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {
	private final TaskRepository taskRepository;

	public TaskService(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	public ApiResponse<Task> createTask(Task taskData) {
		Task task = taskRepository.save(taskData);
		return new ApiResponse<>(true, "Task created successfully", task);
	}

	public ApiResponse<List<Task>> getAllTasks() {
		List<Task> tasks = taskRepository.findAll();
		return new ApiResponse<>(true, "all Tasks", tasks);
	}

	public ApiResponse<List<Task>> getTasksByUser(Long userId) {
		List<Task> tasks = taskRepository.findByUserId(userId);

		return new ApiResponse<>(true, "tasks", tasks);
	}

	public ApiResponse<Task> updateTask(Long taskId, Task updatedTask) {
		Task task = taskRepository.findById(taskId).orElse(null);
		if (task == null) {
			return new ApiResponse<>(false, "Task not found", null);
		}
		if (updatedTask.getTask() == null || updatedTask.getTask().trim().isEmpty()) {
			return new ApiResponse<>(false, "Task should not empty", null);
		}
		task.setTask(updatedTask.getTask());
		task.setStatus(updatedTask.getStatus());
		Task updatedRes = taskRepository.save(task);
		return new ApiResponse<>(true, "Task updated successfully", updatedRes);
	}

	public ApiResponse<Task> deleteTask(Long taskId) {
		boolean exists = taskRepository.existsById(taskId);
		if (!exists) {
			return new ApiResponse<>(false, "Task not found", null);
		}
		taskRepository.deleteById(taskId);

		return new ApiResponse<>(true, "Task deleted successfully", null);
	}
}
