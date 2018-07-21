import { Person } from './person';

export class PersonWrapper extends Person {
    groupName: string;

    public static createPersonWrap(person: Person, groupName: string): PersonWrapper {
        var wrap = new PersonWrapper();
        wrap.groupId = person.groupId,
        wrap.groupName = groupName,
        wrap.id = person.id,
        wrap.name = person.name,
        wrap.number = person.number,
        wrap.age = person.age
        return wrap;
    }
}
