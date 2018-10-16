### 安装

```
npm i mydirtool --save
```

### 使用
```
import {dirTool} from  'mydirtool';

dirTool(list)

```

list 结构如下
```
    const list = [
        {
            "createdAt": 1539328100000,
            "updatedAt": 1539328100000,
            "name": "杯具熊素材照片/demo/2.xsl",
            "project": {"createdAt": null, "updatedAt": null, "name": "测试项目"},
        },
        {
            "createdAt": 1539328100000,
            "updatedAt": 1539328100000,
            "name": "33.doc",
            "project": {"createdAt": null, "updatedAt": null, "name": "测试项目"},
        },
        {
            "createdAt": 1539328100000,
            "updatedAt": 1539328100000,
            "name": "demo/33.doc",
            "project": {"createdAt": null, "updatedAt": null, "name": "测试项目"},
        },
        {
            "createdAt": 1539328100000,
            "updatedAt": 1539328100000,
            "name": "杯具熊素材照片/demo/3.xsl",
            "project": {"createdAt": null, "updatedAt": null, "name": "测试项目"},
        },
        {
            "createdAt": 1539328100000,
            "updatedAt": 1539328100000,
            "name": "杯具熊素材照片/demo/test/1.xsl",
            "project": {"createdAt": null, "updatedAt": null, "name": "测试项目"},
        },
        {
            "createdAt": 1539328100000,
            "updatedAt": 1539328100000,
            "name": "杯具熊素材照片/test/1.xsl",
            "project": {"createdAt": null, "updatedAt": null, "name": "测试项目"},
        },
    ];
```

转换之后的结构如下

```
[
  {
    name: '网络综合布线与组网实战',
    directory: [
      {
        name: 'demo',
        directory: [
          {
            name: '一期',
            files: [
              {
                name: '4.xsl',
                size: 1000
              },
            ]
        }],
      },
    ],
    files: []
  }
];

```
