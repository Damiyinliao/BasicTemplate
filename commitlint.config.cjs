module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-case': [2, 'always', ['lower-case', 'upper-case']],
        'type-enum': [
            2,
            'always',
            [
                'feat', //新的特性
                'fix', //修复Bug
                'docs',  //添加或更新文档
                'style', //代码格式的更改
                'refactor', //代码进行重构
                'perf', //提升性能
                'test', //添加或更新测试用例
                'chore',  //更改配置文件
                'revert',  //版本回退
                'merge',  //分支合并
                'build',  //打包工具的更改
                'release',  //发布/版本标签
                'ci'  //对CI配置和脚本的更改
            ]
        ]
    }
}