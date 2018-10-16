const { dirTool } = require('../src');

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

const result = dirTool(list);

console.log(result);

