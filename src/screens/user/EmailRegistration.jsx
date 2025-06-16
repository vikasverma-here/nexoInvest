import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { registerEmailForUser, verifyEmailOtp } from '../../api/user-api'; // Replace with actual path

const EmailRegistration = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = async () => {
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your email',
      });
      return;
    }

    try {
      const response = await registerEmailForUser({ email });

      if (response.success) {
        Swal.fire({
          title: 'Enter OTP',
          input: 'text',
          inputLabel: 'We sent an OTP to your email',
          inputPlaceholder: 'Enter OTP here',
          showCancelButton: true,
          confirmButtonText: 'Verify OTP',
          preConfirm: async (otp) => {
            if (!otp) {
              Swal.showValidationMessage('OTP is required');
              return false;
            }
            try {
              const otpResponse = await verifyEmailOtp({ email, otp });
              if (otpResponse.success) {
                Swal.fire({
                  icon: 'success',
                  title: 'Email Verified',
                  text: 'Your email has been successfully verified!',
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Invalid OTP',
                  text: otpResponse.message || 'Please try again.',
                });
              }
            } catch (err) {
              Swal.fire({
                icon: 'error',
                title: 'OTP Verification Failed',
                text: err?.response?.data?.message || err.message,
              });
            }
          },
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Failed to Add Email',
          text: response.message || 'Try again.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Request Failed',
        text: err?.response?.data?.message || err.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl mt-10 p-8 rounded-2xl border border-white/30 backdrop-blur-md bg-white/10 shadow-lg flex flex-col items-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-sm text-center">
          Register Your Email
        </h2>

        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full px-4 py-3 rounded-lg text-lg text-white bg-white/20 border border-white/30 backdrop-blur-sm placeholder-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleEmailSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Add Email
        </button>
      </div>
    </div>
  );
};

export default EmailRegistration;
