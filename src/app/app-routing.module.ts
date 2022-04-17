import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecodeComponent } from './decode/decode.component';
import { EncoderComponent } from './encoder/encoder.component';

const routes: Routes = [
  {path: 'decoder', component: DecodeComponent},
  {path: 'encoder', component: EncoderComponent},
  {path: '**', component : EncoderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
