import {Injectable} from '@angular/core';
import {
    HttpClient
} from '@angular/common/http';
import swal from 'sweetalert2';
@Injectable()
export class SharedService
{
    
AlertBox(type,title,text)
{
   swal({type,title,text})

}
}