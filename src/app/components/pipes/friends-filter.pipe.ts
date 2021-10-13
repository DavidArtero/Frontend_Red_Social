import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts = [];
    for(const follow of value){
      if(follow.followed.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 
        || follow.followed.surname.toLowerCase().indexOf(arg.toLowerCase())> -1){
         resultPosts.push(follow);
      };
    };
    return resultPosts;
  }

}