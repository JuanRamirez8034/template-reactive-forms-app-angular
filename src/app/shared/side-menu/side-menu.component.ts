import { Component} from '@angular/core';

// interfaz
interface ItemMenu{
  label:string;
  url:string;
  icon ?: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public templateMenu : ItemMenu[] = [
    {
      label:'Basics',
      url:'/template/basics'
    },
    {
      label:'Dynamics',
      url:'/template/dynamics'
    },
    {
      label:'Switches',
      url:'/template/switches'
    }
  ];

  public reactiveMenu : ItemMenu[] = [
    {
      label:'Basics',
      url:'/reactive/basics'
    },
    {
      label:'Dynamics',
      url:'/reactive/dynamics'
    },
    {
      label:'Switches',
      url:'/reactive/switches'
    }
  ];

}
