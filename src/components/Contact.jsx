import { useState, useRef } from "react";
import { motion } from 'framer-motion';
import { styles } from '../styles';
import emailjs from '@emailjs/browser';

import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  // Reference to the form element
  const formRef = useRef();
  
  // State for managing form input fields
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for managing validation errors
  const [errors, setErrors] = useState({});

  // State to track loading state during form submission
  const [loading, setLoading] = useState(false);

  // Handle input change for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.message) newErrors.message = 'Message is required';
    
    // Email format validation (basic)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailPattern.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop form submission if there are validation errors
    }

    setLoading(true);
    
    // EmailJS send method for sending email with the provided form data
    emailjs.send(
      'service_yxudmck',
      'template_9qa1wca',
      {
        from_name: form.name,
        to_name: 'Charles',
        from_email: form.email,
        to_email: 'charlesadiks@gmail.com',
        message: form.message,
      },
      '0doGALnr-Fx0KSo2M'
    )
    .then(() => {
      setLoading(false);
      alert('Thank you. I will get back to you shortly.');
      
      // Reset form fields after successful submission
      setForm({
        name: '',
        email: '',
        message: '',
      });
      setErrors({}); // Clear errors after successful submission
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
      alert('Something went wrong. Please try again later.');
    });
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div 
        variants={slideIn('left', 'tween', 0.2, 1)} 
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Hire me</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {/* Name input field */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="Enter your name" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            {errors.name && <span className="text-red-500 text-sm mt-2">{errors.name}</span>}
          </label>

          {/* Email input field */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            {errors.email && <span className="text-red-500 text-sm mt-2">{errors.email}</span>}
          </label>

          {/* Message input field */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea 
              rows="7"
              name="message" 
              value={form.message} 
              onChange={handleChange} 
              placeholder="Tell me something..." 
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
            {errors.message && <span className="text-red-500 text-sm mt-2">{errors.message}</span>}
          </label>

          {/* Submit button */}
          <button
            type="submit" 
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
        o    {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[650px] h-[450px] flex justify-center items-center"
        >
         

        <img
          src="/images/aio.png"
          alt="AIO"
          className="max-w-[500px] max-h-[500px] object-contain rounded-xl"
          loading="lazy"
        />
      </motion.div>


    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
