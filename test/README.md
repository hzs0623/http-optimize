### Jest | expect常用匹配方法 🚀

1. toBe 使用 Object.is 判断是否严格相等。
2. toEqual 递归检查对象或数组的每个字段。
3. toBeNull 只匹配 null。
4. toBeUndefined 只匹配 undefined。
5. toBeDefined 只匹配非 undefined。
6. toBeTruthy 只匹配真。
7. toBeFalsy 只匹配假。
8. toBeGreaterThan 实际值大于期望。
9. toBeGreaterThanOrEqual 实际值大于或等于期望值
10. toBeLessThan 实际值小于期望值。
11. toBeLessThanOrEqual 实际值小于或等于期望值。
12. toBeCloseTo 比较浮点数的值，避免误差。
13. toMatch 正则匹配。
14. toContain 判断数组中是否包含指定项。
15. toHaveProperty(keyPath, value) 判断对象中是否包含指定属性。
16. toThrow 判断是否抛出指定的异常。
17. toBeInstanceOf 判断对象是否是某个类的实例，底层使用 instanceof

👋
