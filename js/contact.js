/**
 * COS 106 – Introduction to Web Technologies | Practical Term Project
 * Student: Apaokagi Ashraf Abdulquadir (MIVA Open University)
 * File: js/contact.js — Contact Form Validation Engine
 *
 * Enforces COS 106 Functional & Technical Requirements:
 *   1. No field is empty (Name, Email Address, Phone Number, Message)
 *   2. Email format is valid
 *   3. Phone number contains ONLY digits (/^\d+$/)
 */

(function () {
  'use strict';

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const DIGITS_ONLY_REGEX = /^\d+$/;

  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const phoneInput = document.getElementById('contact-phone');
  const messageInput = document.getElementById('contact-message');

  const nameError = document.getElementById('error-name');
  const emailError = document.getElementById('error-email');
  const phoneError = document.getElementById('error-phone');
  const messageError = document.getElementById('error-message');
  const feedbackBanner = document.getElementById('form-feedback');

  /**
   * Validate individual field and update its DOM state
   */
  function validateName() {
    const value = nameInput.value.trim();
    if (value.length === 0) {
      setFieldError(nameInput, nameError, 'Full Name is required and cannot be empty.');
      return false;
    }
    setFieldValid(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (value.length === 0) {
      setFieldError(emailInput, emailError, 'Email Address is required and cannot be empty.');
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address (e.g., name@domain.com).');
      return false;
    }
    setFieldValid(emailInput, emailError);
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    if (value.length === 0) {
      setFieldError(phoneInput, phoneError, 'Phone Number is required and cannot be empty.');
      return false;
    }
    if (!DIGITS_ONLY_REGEX.test(value)) {
      setFieldError(
        phoneInput,
        phoneError,
        'Phone Number must contain only digits (0–9) with no spaces, plus signs, or hyphens.'
      );
      return false;
    }
    setFieldValid(phoneInput, phoneError);
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value.length === 0) {
      setFieldError(messageInput, messageError, 'Message cannot be empty. Please write your inquiry.');
      return false;
    }
    setFieldValid(messageInput, messageError);
    return true;
  }

  function setFieldError(inputEl, errorEl, message) {
    inputEl.classList.remove('input-valid');
    inputEl.classList.add('input-error');
    inputEl.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function setFieldValid(inputEl, errorEl) {
    inputEl.classList.remove('input-error');
    inputEl.classList.add('input-valid');
    inputEl.setAttribute('aria-invalid', 'false');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function resetFieldStates() {
    [
      [nameInput, nameError],
      [emailInput, emailError],
      [phoneInput, phoneError],
      [messageInput, messageError]
    ].forEach(function (pair) {
      const input = pair[0];
      const err = pair[1];
      if (input) {
        input.classList.remove('input-error', 'input-valid');
        input.removeAttribute('aria-invalid');
      }
      if (err) {
        err.textContent = '';
      }
    });
  }

  function showFeedback(type, message) {
    if (!feedbackBanner) return;
    feedbackBanner.className = 'form-feedback ' + type;
    feedbackBanner.textContent = message;
  }

  function clearFeedback() {
    if (!feedbackBanner) return;
    feedbackBanner.className = 'form-feedback';
    feedbackBanner.textContent = '';
  }

  function initContactForm() {
    if (!form) return;

    // Live validation on input after first interaction
    nameInput.addEventListener('input', function () {
      clearFeedback();
      validateName();
    });

    emailInput.addEventListener('input', function () {
      clearFeedback();
      validateEmail();
    });

    phoneInput.addEventListener('input', function () {
      clearFeedback();
      validatePhone();
    });

    messageInput.addEventListener('input', function () {
      clearFeedback();
      validateMessage();
    });

    // Form submit validation handler
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      clearFeedback();

      const isNameOk = validateName();
      const isEmailOk = validateEmail();
      const isPhoneOk = validatePhone();
      const isMessageOk = validateMessage();

      if (!isNameOk || !isEmailOk || !isPhoneOk || !isMessageOk) {
        showFeedback(
          'error',
          'Validation failed: Please correct the highlighted fields below before submitting.'
        );
        return;
      }

      const senderName = nameInput.value.trim();
      const senderEmail = emailInput.value.trim();

      form.reset();
      resetFieldStates();

      showFeedback(
        'success',
        'Thank you, ' +
          senderName +
          '! Your message has been validated and sent. A confirmation copy will be directed to ' +
          senderEmail +
          '.'
      );
    });
  }

  document.addEventListener('DOMContentLoaded', initContactForm);
})();
