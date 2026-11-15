/**
 * COS 106 – Introduction to Web Technologies | Practical Term Project
 * Student: Apaokagi Ashraf Abdulquadir (MIVA Open University)
 * File: js/planner.js — Interactive Academic Task Management System
 * Demonstrates: Arrays, Functions, Event Handling, DOM Manipulation,
 *               Form Validation, Dynamic Content Updates, and localStorage.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'cos106_academic_planner_tasks_v1';

  // Default sample tasks aligned with MIVA Open University Semester Coursework
  const DEFAULT_TASKS = [
    {
      id: 'task-1',
      title: 'CSC 106: Complete Responsive Student Portfolio & Academic Planner Project',
      completed: false
    },
    {
      id: 'task-2',
      title: 'COS 102: Practice Algorithm Flowchart & Structured Problem-Solving Exercises',
      completed: true
    },
    {
      id: 'task-3',
      title: 'COS 111: Review Technical Certification Computing Lab Modules',
      completed: false
    },
    {
      id: 'task-4',
      title: 'MATH 102 & PHY 102: Solve Calculus & Electricity Tutorial Problem Sets',
      completed: false
    },
    {
      id: 'task-5',
      title: 'PHY 108: Prepare Lab Report for General Physics Practical II',
      completed: true
    }
  ];

  // Application State Array
  let tasks = [];

  // DOM Element References
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskError = document.getElementById('task-error');
  const taskListEl = document.getElementById('task-list');
  const totalCountEl = document.getElementById('total-count');
  const completedCountEl = document.getElementById('completed-count');
  const pendingCountEl = document.getElementById('pending-count');
  const resetTasksBtn = document.getElementById('reset-tasks-btn');

  /**
   * Load tasks array from localStorage or seed with DEFAULT_TASKS
   */
  function loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          tasks = parsed;
          return;
        }
      }
    } catch (err) {
      console.warn('Unable to read tasks from localStorage:', err);
    }
    tasks = DEFAULT_TASKS.map(function (item) {
      return Object.assign({}, item);
    });
    saveTasks();
  }

  /**
   * Persist current tasks array to localStorage
   */
  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.warn('Unable to save tasks to localStorage:', err);
    }
  }

  /**
   * Add a new task to the tasks array
   * @param {string} rawTitle
   */
  function addTask(rawTitle) {
    const trimmedTitle = rawTitle.trim();

    if (!trimmedTitle) {
      showError('Please enter an academic task title before adding.');
      taskInput.classList.add('input-error');
      taskInput.focus();
      return;
    }

    clearError();

    const newTask = {
      id: 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      title: trimmedTitle,
      completed: false
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = '';
    taskInput.focus();
  }

  /**
   * Toggle completion status of a task by ID
   * @param {string} taskId
   */
  function toggleTaskCompletion(taskId) {
    tasks = tasks.map(function (task) {
      if (task.id === taskId) {
        return {
          id: task.id,
          title: task.title,
          completed: !task.completed
        };
      }
      return task;
    });

    saveTasks();
    renderTasks();
  }

  /**
   * Delete a task from the array by ID
   * @param {string} taskId
   */
  function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
      return task.id !== taskId;
    });

    saveTasks();
    renderTasks();
  }

  /**
   * Reset tasks to default semester sample list
   */
  function resetSampleTasks() {
    tasks = DEFAULT_TASKS.map(function (item) {
      return Object.assign({}, item);
    });
    clearError();
    saveTasks();
    renderTasks();
  }

  /**
   * Update live task statistics counters in the DOM
   */
  function updateCounters() {
    const total = tasks.length;
    const completed = tasks.filter(function (task) {
      return task.completed;
    }).length;
    const pending = total - completed;

    if (totalCountEl) totalCountEl.textContent = String(total);
    if (completedCountEl) completedCountEl.textContent = String(completed);
    if (pendingCountEl) pendingCountEl.textContent = String(pending);
  }

  /**
   * Render the tasks array into the DOM list (#task-list)
   */
  function renderTasks() {
    if (!taskListEl) return;

    taskListEl.innerHTML = '';
    updateCounters();

    if (tasks.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'empty-state';
      emptyLi.textContent = 'No academic tasks in your planner. Use the input above to add a new task.';
      taskListEl.appendChild(emptyLi);
      return;
    }

    tasks.forEach(function (task) {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      li.setAttribute('data-task-id', task.id);

      // Left wrapper with title
      const leftDiv = document.createElement('div');
      leftDiv.className = 'task-left';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'task-title';
      titleSpan.textContent = task.title;

      leftDiv.appendChild(titleSpan);

      // Right wrapper with Complete & Delete buttons
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'task-actions';

      const completeBtn = document.createElement('button');
      completeBtn.type = 'button';
      completeBtn.className = 'btn-complete';
      completeBtn.setAttribute('data-action', 'toggle');
      completeBtn.setAttribute('data-id', task.id);
      completeBtn.setAttribute(
        'aria-label',
        (task.completed ? 'Mark as pending: ' : 'Mark as completed: ') + task.title
      );
      completeBtn.textContent = task.completed ? '✓ Completed' : 'Complete';

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn-delete';
      deleteBtn.setAttribute('data-action', 'delete');
      deleteBtn.setAttribute('data-id', task.id);
      deleteBtn.setAttribute('aria-label', 'Delete task: ' + task.title);
      deleteBtn.textContent = 'Delete';

      actionsDiv.appendChild(completeBtn);
      actionsDiv.appendChild(deleteBtn);

      li.appendChild(leftDiv);
      li.appendChild(actionsDiv);

      taskListEl.appendChild(li);
    });
  }

  function showError(message) {
    if (taskError) {
      taskError.textContent = message;
    }
  }

  function clearError() {
    if (taskError) {
      taskError.textContent = '';
    }
    if (taskInput) {
      taskInput.classList.remove('input-error');
    }
  }

  /**
   * Bind Event Listeners
   */
  function initPlanner() {
    if (!taskForm || !taskListEl) return;

    loadTasks();
    renderTasks();

    // Form submit event handler
    taskForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTask(taskInput.value);
    });

    // Clear error when typing
    taskInput.addEventListener('input', function () {
      if (taskInput.value.trim().length > 0) {
        clearError();
      }
    });

    // Event delegation for Complete and Delete buttons
    taskListEl.addEventListener('click', function (event) {
      const targetBtn = event.target.closest('button[data-action]');
      if (!targetBtn) return;

      const action = targetBtn.getAttribute('data-action');
      const taskId = targetBtn.getAttribute('data-id');

      if (action === 'toggle') {
        toggleTaskCompletion(taskId);
      } else if (action === 'delete') {
        deleteTask(taskId);
      }
    });

    // Reset sample tasks button
    if (resetTasksBtn) {
      resetTasksBtn.addEventListener('click', function () {
        resetSampleTasks();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initPlanner);
})();
