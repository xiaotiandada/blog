# issues99

## ValidationPipe
> https://docs.nestjs.com/techniques/validation#stripping-properties
> http://static.kancloud.cn/juukee/nestjs/2675355
> https://juejin.cn/post/7064595876680826910
### transform
```ts
app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
);
 ```
 
 ```ts
@Get(':id')
findOne(@Param('id') id: number) {
  console.log(typeof id === 'number'); // true
  return 'This action returns a user';
}
```
 
 id 会自动从 string 转换成 number

### whitelist
```ts
app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
);
 ```
 
true 时，自动删除非白名单属性(在验证类中没有任何修饰符的属性)。

```ts
// Bad
// 所有参数都将被过滤
export class CreateCatDto {
  public name: string;

  public age: number;
  
  public breed: string;
}


// Good
import { IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  public name: string;

  @IsNumber()
  public age: number;

  @IsString()
  public breed: string;
}
```