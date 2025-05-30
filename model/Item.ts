import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Item extends Model {
  static table = 'items';

  @field('name') name;
  @field('value') value;
}
