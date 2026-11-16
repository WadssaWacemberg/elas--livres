import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DEMO_JOBS, Job, Modality, filterJobs, isModality } from './jobs.data';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.css',
})
export class JobSearchComponent {
  showSimpleHelp = false;
  keyword = '';
  selectedModality: Modality | '' = '';
  results: readonly Job[] = DEMO_JOBS;
  hasSearched = false;
  errorMessage = '';

  search(): void {
    if (!isModality(this.selectedModality)) {
      this.errorMessage = 'Selecione uma modalidade válida.';
      this.results = [];
      this.hasSearched = false;
      return;
    }
    this.errorMessage = '';
    this.results = filterJobs(DEMO_JOBS, this.keyword, this.selectedModality);
    this.hasSearched = true;
  }

  reset(): void {
    this.keyword = '';
    this.selectedModality = '';
    this.results = DEMO_JOBS;
    this.hasSearched = false;
    this.errorMessage = '';
  }
}
