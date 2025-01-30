import { Component, signal } from '@angular/core';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';
@Component({
  selector: 'app-avatar-upload',
  imports: [DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
onFileDroped($event: Event) {
throw new Error('Method not implemented.');
}

  avatar=null;
  preview = signal<string>('/assets/images/avatar-placeholder.png')

fileBrowserHandler($event: Event) {
  const file= (event?.target as HTMLInputElement)?.files?.[0]

  if(!file || file.type.match('image')) return

  const reader = new FileReader

  reader.onload = event => {
    this.preview.set(event.target?.result?.toString() ?? '')
  }

  reader.readAsDataURL(file)
}
  processFile(file:File | null) {
    if(!file || !file.type.match('image')) return 

    const reader = new FileReader() 

    reader.onload = event => {
      this.preview.set(event.target?.result?.toString()?? '')
    }
  }
}


