
/**
 **@desc: 根据项目聚合文件
 **@date: 2018/10/12 下午5:00
 **@author: 小建
 */
const getProjectList = (list) => {
    let result = [];
    list.map((item) => {

        if(result.length){
        let flag = true;
        result.map((projectItem,index)=>{
            // 目前通过name对比同一项目
            if(projectItem.name === item.project.name){
            result[index].fileList.push(item);
            flag = false;
        }
    });

        if(flag){
            const project = item.project;
            project.fileList = [item];
            result.push(project);
        }

    }else{
        const project = item.project;
        project.fileList = [item];
        result.push(project);
    }

});
    return result;
};


/**
 **@desc: 将flies 列表 转成如下树结构
 **@date: 2018/10/12 下午5:26
 **@author: 小建

 */

// [
//   {
//     name: '网络综合布线与组网实战',
//     directory: [
//       {
//         name: 'demo',
//         directory: [
//           {
//             name: '一期',
//             files: [
//               {
//                 name: '4.xsl',
//                 size: 1000
//               },
//             ]
//         }],
//       },
//     ],
//     files: []
//   }
// ];




getFileTree = (list) => {
    const directory = [];
    const files = [];

    const mountResult = (item) =>{

        const fileNameSplitList = item.name.split('/');
        const fileNameSplitListLength = fileNameSplitList.length;
        const fileName = fileNameSplitList[fileNameSplitListLength -1];

        const getDirObj = (index) =>{
            const nextIndex = index + 1;
            const name = fileNameSplitList[index];

            if(fileNameSplitListLength === 2){
                return {
                    name,
                    files:[Object.assign(item,{name:fileName})]
                }
            }else{

                if(nextIndex === fileNameSplitListLength -1 ){

                    return [{
                        name,
                        files:[Object.assign(item,{name:fileName})]
                    }]

                }
                else {
                    if(index === 0){
                        return {
                            name,
                            directory: getDirObj(nextIndex),
                            files:[]
                        }
                    }
                    else {
                        return [{
                            name,
                            directory: getDirObj(nextIndex),
                            files:[]
                        }]
                    }
                }
            }
        };

        getNextFileNameSplitList = (startIndex)=>{
            const result = [];
            for(startIndex; startIndex < fileNameSplitListLength; startIndex++ ){
                result.push(fileNameSplitList[startIndex])
            }
            return result;
        };

        getExistDirObj = (index,nextFileNameSplitList) =>{
            const name = nextFileNameSplitList[index];
            const nextIndex = index + 1;

            if(nextFileNameSplitList.length === 2){
                return {
                    name,
                    files:[Object.assign(item,{name:fileName})]
                }
            }
            else{

                if(nextIndex === nextFileNameSplitList.length -1 ){
                    return {
                        name,
                        files:[Object.assign(item,{name:fileName})]
                    }
                }
                else {
                    if(index === 0){
                        return {
                            name,
                            directory: getExistDirObj(nextIndex,nextFileNameSplitList),
                            files:[]
                        }
                    }else{
                        return [{
                            name,
                            directory: getExistDirObj(nextIndex,nextFileNameSplitList),
                            files:[]
                        }]
                    }
                }
            }
        };

        const findIndexs = (i,directory, indexs)=>{
            const result = indexs || [];
            const nextIndex = i + 1;
            if(nextIndex < fileNameSplitListLength){
                const name = fileNameSplitList[i];
                directory.forEach((dirObj,index)=>{
                    if( name === dirObj.name){
                    result.push(index);
                    if(dirObj.directory){
                        findIndexs(nextIndex,dirObj.directory,result);
                    }
                }
            })
            }
            return result;
        };

        // 结果集有值
        if(directory.length){
            const indexs = findIndexs(0,directory);
            // 目录存在
            if(indexs.length){
                // 目录全部存在
                if( indexs.length === fileNameSplitListLength-1){

                    const getFilesNode = (i,directory) => {
                        if(i < indexs.length -1 ){

                            getFilesNode(i+1,directory[indexs[i]].directory)

                        }else if(i === indexs.length -1){
                            directory[indexs[i]].files.push(Object.assign(item,{name:fileName}))
                        }
                    };

                    getFilesNode(0,directory);

                }
                // 目录部分存在
                else {
                    const getDirectoryNode = (i,directory) => {
                        if(i < indexs.length - 1){

                            getDirectoryNode(i+1,directory[indexs[i]].directory)

                        }else if(i === indexs.length -1){

                            const temp =  getExistDirObj(0, getNextFileNameSplitList(i+1));
                            if(directory[indexs[i]].directory){
                                directory[indexs[i]].directory.push(temp);
                            }else{
                                directory[indexs[i]].directory = [temp]
                            }


                        }
                    };
                    getDirectoryNode(0,directory);
                }
            }
            // 目录不存在
            else{
                // 纯文件 叠加到files
                if(fileNameSplitListLength === 1){
                    files.push(item);
                }
                // 有目录
                else {
                    directory.push(getDirObj(0));
                }
            }
        }
        // 结果集无数据 第一次添加
        else{
            // 纯文件
            if(fileNameSplitListLength === 1){
                files.push(item)
            }
            // 有目录
            else {
                directory.push(getDirObj(0))
            }
        }
    };
    list.forEach((item)=>{
        mountResult(item);
});

    return {
        directory,
        files
    }
};



const dirTool = (list) =>{
    const files = getProjectList(list);
    return files.map((item)=>{
        const {directory,files} =  getFileTree(item.fileList);
        item.directory = directory;
        item.files = files;
        delete item.fileList;
        return item
    });
};


module.exports =  {
    getProjectList,
    getFileTree,
    dirTool,
};


