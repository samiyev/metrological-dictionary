import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) return value;

    return value.filter(({group, term, definition}) => {
      return group.ru.toLowerCase().indexOf(args.toLowerCase()) > -1
        || group.uz.toLowerCase().indexOf(args.toLowerCase())> -1
        || term.uz.toLowerCase().indexOf(args.toLowerCase())> -1
        || term.ru.toLowerCase().indexOf(args.toLowerCase())> -1
        || definition.uz.toLowerCase().indexOf(args.toLowerCase())> -1
        || definition.ru.toLowerCase().indexOf(args.toLowerCase())> -1
    });
  }
}
