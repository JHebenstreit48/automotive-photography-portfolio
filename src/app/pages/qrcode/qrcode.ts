import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import QRCode from 'qrcode';

@Component({
  selector: 'app-qrcode',
  imports: [RouterLink],
  templateUrl: './qrcode.html',
  styleUrl: './qrcode.scss'
})
export class Qrcode implements OnInit {
  @ViewChild('qrCanvas', { static: true })
  qrCanvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    QRCode.toCanvas(this.qrCanvas.nativeElement,
      'https://steel-and-shutter.netlify.app', {
      width: 180,
      color: {
        dark: '#0e0e0e',
        light: '#ffffff'
      }
    });
  }
}