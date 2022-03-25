### Record

```
Record<Keys, Type>
```

- sẽ nhận vào 2 tham số, tham số thứ nhất sẽ là type của tên các property của một object và tham số thứ 2 sẽ là type cho tất cả các property của object đó.

- Case 1: su dung khi cac object chua co cac properties cu the nhung biet type no la gi

- Case 2: cũng có thể được sử dụng trong trường hợp bạn đã biết trước các property của object, nhưng tất cả giá trị của object phải là có cùng một kiểu dữ liệu.

```
type Test = Record<'prop1' | 'prop2' | 'prop3', number>;
let obj: Test;

obj = {
    prop1: 1,
    prop2: 2,
    prop3: 3
}
```

```
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

```

===================

### Pick

```
Pick<Type, Keys>
```

- trich ra cac type co trong Keys

```
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

- chung ta se thay type cua TodoPreview se duoc trich ra tu type Todo dua vao Keys luc nay la "title" | "completed"

Notes:

1. https://zenn.dev/nbr41to/articles/365e8105efa448