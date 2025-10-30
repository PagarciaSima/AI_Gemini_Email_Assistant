import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailGeneratorService } from '../services/email-generator.service';
import { NotificationService } from '../services/notification.service';
import { EmailRequestDto } from '../model/EmailRequestDto';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnInit {
  emailForm: FormGroup;
  generatedReply: string = '';
  isGenerating: boolean = false;
  showGeneratedReply: boolean = false;

  toneOptions = [
    { value: 'casual', label: 'Casual' },
    { value: 'professional', label: 'Professional' },
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'assertive', label: 'Assertive' },
    { value: 'apologetic', label: 'Apologetic' }
  ];

  constructor(
    private fb: FormBuilder,
    private emailService: EmailGeneratorService,
    private notificationService: NotificationService
  ) {
    this.emailForm = this.fb.group({
      emailContent: ['', [Validators.required, Validators.minLength(10)]],
      tone: ['professional'] // Default tone, optional
    });
  }

  ngOnInit(): void {}

  /** Getter for email content form control */
  get emailContent() {
    return this.emailForm.get('emailContent');
  }

  /** Getter for tone form control */
  get tone() {
    return this.emailForm.get('tone');
  }

  /**
   * Generates an email reply based on the form input.
   */
  generateReply(): void {
    if (this.emailForm.valid) {
      this.isGenerating = true;
      this.showGeneratedReply = false;

      const emailRequest: EmailRequestDto = {
        emailContent: this.emailForm.value.emailContent,
        tone: this.emailForm.value.tone
      };

      this.emailService.generateEmail(emailRequest).subscribe({
        next: (response) => {
          this.generatedReply = response;
          this.showGeneratedReply = true;
          this.isGenerating = false;
          this.notificationService.success('Your email reply has been generated successfully!', 'Success');
        },
        error: (error) => {
          console.error('Error generating email:', error);
          this.isGenerating = false;
          this.notificationService.error('There was an error generating your email reply. Please try again.', 'Generation Error');
        }
      });
    } else {
      this.notificationService.warning('Please fill in the required fields correctly before generating a reply.', 'Form Validation');
    }
  }

  /**
   * Copies the generated reply to the clipboard.
   * @returns {Promise<void>}
   */
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedReply).then(() => {
      this.notificationService.snackMessage('Reply copied to clipboard! 📋', 2000);
    }).catch(err => {
      console.error('Error copying to clipboard:', err);
      this.notificationService.error('Could not copy to clipboard. Please try selecting and copying manually.', 'Copy Error');
    });
  }

  /**
   * Clears the form after user confirmation.
   * @returns {Promise<void>}
   */
  async clearForm(): Promise<void> {
    if (this.emailForm.dirty || this.showGeneratedReply) {
      const confirmed = await this.notificationService.confirm(
        'This will clear all your current work. Are you sure you want to continue?',
        'Clear Form'
      );
      
      if (confirmed) {
        this.emailForm.reset();
        this.emailForm.patchValue({ tone: 'professional' });
        this.generatedReply = '';
        this.showGeneratedReply = false;
        this.notificationService.snackMessage('Form cleared successfully!', 2000);
      }
    } else {
      this.emailForm.reset();
      this.emailForm.patchValue({ tone: 'professional' });
      this.generatedReply = '';
      this.showGeneratedReply = false;
    }
  }
}
