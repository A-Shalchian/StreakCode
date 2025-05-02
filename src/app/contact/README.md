# Contact Form with EmailJS Integration

This contact page uses EmailJS to send emails directly from client-side JavaScript without requiring a backend server.

## Setup Instructions

To make the contact form functional, you need to set up EmailJS:

1. **Create an EmailJS Account:**

   - Sign up at [EmailJS.com](https://www.emailjs.com/)
   - The free tier allows 200 emails per month

2. **Create an Email Service:**

   - Go to the EmailJS dashboard
   - Click on "Email Services" and then "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the authentication steps

3. **Create an Email Template:**

   - Go to "Email Templates" and click "Create New Template"
   - Design your email template with placeholders for form fields
   - Example template content:
     ```html
     <h1>New Contact Message</h1>
     <p>You have received a new contact form submission:</p>
     <p><strong>Name:</strong> {{user_name}}</p>
     <p><strong>Email:</strong> {{user_email}}</p>
     <p><strong>Subject:</strong> {{subject}}</p>
     <p><strong>Message:</strong> {{message}}</p>
     ```
   - Save your template

4. **Configure Environment Variables:**
   - Create a `.env.local` file in the root of your project
   - Add the following variables:
     ```
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```
   - Replace the placeholders with your actual values from EmailJS

## Form Field Names

The form field names must match the template variables you've defined in your EmailJS template:

- `user_name` - The name of the person contacting you
- `user_email` - The email address of the person contacting you
- `subject` - The subject of the message
- `message` - The content of the message

## How EmailJS Integration Works

1. The configuration values are managed in `src/utils/email_config.ts`
2. The contact form uses the EmailJS browser library to send emails
3. Form submissions are validated and handled with proper error checking
4. Users receive feedback through toast notifications and status messages

## Customization

If you want to modify the email template or change the form fields:

1. Update your template in the EmailJS dashboard
2. Make sure the field names in the form match your template variables
3. Test the form to ensure everything works correctly

## Limitations

- The free tier of EmailJS allows 200 emails per month
- For production sites with higher volume, consider upgrading your EmailJS plan
- For highly sensitive information, consider using a server-side solution
