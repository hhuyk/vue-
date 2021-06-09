名词：
依赖收集：通过自然地使用变量，来完成依赖的收集，当变量改变时，根据收集的依赖判断是否需要触发回调。

typeof 和 instanceod 区别

typeof
用于判断数据类型，返回值为6个字符串，分别为string、Boolean、number、function、object、undefined。

typeof在判断null、array、object以及函数实例（new + 函数）时，得到的都是object。

instanceof 判断该对象是谁的实例，同时我们也就知道instanceof是对象运算符。