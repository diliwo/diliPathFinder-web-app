import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FileHelperService {
  nav = (window.navigator as any);

  constructor() {}

  public openFileOrSave(data: string, fileName: string) {
    const extension = this.extensionFromFileName(fileName);
    const mimeType = this.mimeTypeExtensionFromExtension(extension);
    if (mimeType) {
      this.openFile(fileName, mimeType, data);
    } else {
      const file = this.base64toBlob(data, extension);
      saveAs(file, fileName);
    }
  }
  public openFileOrSaveFromArrayBuffer(data: ArrayBuffer, fileName: string) {
    const extension = this.extensionFromFileName(fileName);
    const mimeType = this.mimeTypeExtensionFromExtension(extension);
    if (mimeType) {
      this.openFileFromArrayBuffer(fileName, mimeType, data);
    } else {
      saveAs(this.arrayBuffertoBlob(data, extension), fileName);
    }
  }
  openFileFromArrayBuffer(name, type, data) {
    const nav = (window.navigator as any);
    if (nav.msSaveOrOpenBlob) {
      return nav.msSaveOrOpenBlob(
        this.arrayBuffertoBlob(data, type),
        name
      );
    }

    const a = document.createElement('a');

    const url = window.URL.createObjectURL(this.arrayBuffertoBlob(data, type));
    a.href = url;
    a.title = 'File';
    a.target = '_blank';
    a.style.display = 'none';
    // a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    a.remove();


  }

  openFile(name, type, data) {
    const nav = (window.navigator as any);
    if (nav.msSaveOrOpenBlob) {
      console.log('nav.msSaveOrOpenBlob');
      return nav.msSaveOrOpenBlob(
        this.base64toBlob(data, type),
        name
      );
    }
    console.log('Non', nav.msSaveOrOpenBlob);
    console.log('opening new file ', name);
    const a = document.createElement('a');
    a.target = '_blank';
    a.style.display = 'none';

    const url = window.URL.createObjectURL(this.base64toBlob(data, type));
    a.href = url;
    a.title = 'File';
    a.target = '_blank';
    a.style.display = 'none';

    //  a.download = name;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    a.remove();

  }
  extensionFromFileName(fileName: string) {
    if (!fileName) {
      return '';
    }
    return fileName
      .slice(fileName.lastIndexOf('.') + 1)
      .toString()
      .toLowerCase();
  }

  mimeTypeExtensionFromExtension(extension: string) {
    switch (extension) {
      case 'txt':
        return 'text/plain';
      case 'jpeg':
      case 'jpg':
      case 'png':
        return 'image/' + extension;
      case 'pdf':
      case 'zip':
        return 'application/' + extension;
    }
    return '';
  }
  getExtensionAngularIcon(fileName: string) {
    const ext = this.extensionFromFileName(fileName);

    switch (ext) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'jpeg':
      case 'png':
      case 'jpeg':
      case 'jpeg':
        return 'photo';
      case 'docx':
      case 'doc':
        return 'text_format';
      case 'txt':
        return 'text_snippet';
      case 'pptx':
        return 'style';
      case 'msg':
        return 'email';
      default:
        return 'insert_drive_file';
    }
  }
  private base64toArray(base64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return byteArrays;
  }

  private base64toBlob(base64Data, contentType) {
    return new Blob(this.base64toArray(base64Data, contentType), {
      type: contentType
    });
  }
  private arrayBuffertoBlob(data, contentType) {
    return new Blob([data], {
      type: contentType
    });
  }
}
