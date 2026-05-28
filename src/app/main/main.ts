import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { NavBar } from "./nav-bar/nav-bar";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavBar],
  templateUrl: './main.html',
  standalone: true,
})
export class Main {}
