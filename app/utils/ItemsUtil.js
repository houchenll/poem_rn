
// const _ = require('lodash');

// export const getArticleList = list =>
//   (list === undefined ? [] : removeExpiredItem(list));

// export const removeExpiredItem = (list) => {
//   _.remove(list, item => item.expire);
//   return list || [];
// };

// export const getTypeName = (typeList, typeId) =>
//   _.head(_.filter(typeList, o => o.id === typeId.toString())).name;

export const stringJustEmpty = (content) => {
  return (content === undefined || content === '') ? '暂无' : content;
}  

export const printObj = (obj) => {
  var description = "";
  for (var i in obj) {
    description += i + " = " + obj[i] + "\n";
  }
  console.log('ernest', 'obj:' + description);
  return description;
}

export const printArray = (arr) => {
  if (arr === undefined) {
    console.log('ernest', 'arr is not a Array');
    return;
  }

  var description = "";
  for (var key in arr) {
    if (typeof (arr[key]) == 'array' || typeof (arr[key]) == 'object') {//递归调用    
      printArray(arr[key]);
    } else {
      description += key + " = " + arr[key] + "\n";
    }
  }
  console.log('ernest', 'arr.length:' + arr.length + ',arr:' + description);

  return description;

}


export const getList = list =>
  (list === undefined ? [] : list);

export const addKey = (list) => {
  var a = ['A', 'B', 'C'];
  a.forEach(function (element) {
    console.log(element);
  });

  if (list === undefined) {
    return [];
  }
  var result = [];

  if (list instanceof Array) {
    list.forEach(function (element) {
      console.log(element);
      element.key = element.name;
      result.push(element);
    });
  }
  return result;
};

export const processTypeThemeData = (list) => {

  if (list === undefined || list.length === 0) {
    return [];
  }

  let result = [];
  let sections = [];
  list.forEach(function (element, index) {
    let item = {
      id: index + "",
      name: element.name,
      data: element.tags,
    };
    sections.push(element.name);
    result.push(item);
  });
  result.sections = sections;
  return result;
};

export const processAuthorWorksData = (list) => {

  if (list === undefined || list.length === 0) {
    return [];
  }

  let result = [];
  let sections = [];
  list.forEach(function (element, index) {
    let item = {
      id: index + "",
      name: element.bookName,
      data: element.contents,
    };
    sections.push(element.name);
    result.push(item);
  });
  result.sections = sections;
  return result;
};

export const processBookMeunData = (list) => {

  if (list === undefined || list.length === 0) {
    return [];
  }

  let result = [];
  let sections = [];
  list.forEach(function (element, index) {
    let item = {
      id: index + "",
      name: element.name,
      data: element.contents,
    };
    // to do empty name
    sections.push(element.name);
    result.push(item);
  });
  result.sections = sections;
  return result;
};

export const processTypeBookData = (list) => {

  if (list === undefined || list.length === 0) {
    return [];
  }

  let result = [];
  let sections = [];
  list.forEach(function (element, index) {
    let item = {
      id: index + "",
      name: element.name,
      data: element.books,
    };
    sections.push(element.name);
    result.push(item);
  });
  result.sections = sections;
  return result;
};

export const getTypeThemeDataLength = (list) => {
  if (list === undefined || list.length === 0) {
    return 0;
  }
  let size = 0;
  list.forEach(function (element, index) {
    size += element.tags.length;
  });
  return size;
}

export const getMenuListDataLength = (list) => {
  if (list === undefined || list.length === 0) {
    return 0;
  }
  let size = 0;
  list.forEach(function (element, index) {
    size += element.contents.length;
  });
  return size;
}

export const getAuthorWorksDataLength = (list) => {
  
  return getMenuListDataLength(list);
}

export const getTypeBookDataLength = (list) => {
  if (list === undefined || list.length === 0) {
    return 0;
  }
  let size = 0;
  list.forEach(function (element, index) {
    size += element.books.length;
  });
  return size;
}


export const processTypeAuthorData = (list) => {
  if (list === undefined || list.length === 0) {
    return [];
  }

  list.sort(function (s1, s2) {
    // x1 = s1.toUpperCase();
    // x2 = s2.toUpperCase();
    if (s1.namepy < s2.namepy) {
      return -1;
    }
    if (s1.namepy > s2.namepy) {
      return 1;
    }
    return 0;
  });

  // let totalSize = 0;
  let sections = [];
  // let sectionsIndex = [];

  let result = [];
  let fristLetter = '';
  let item = {
    name: '',
    id: '',
    data: [],
  };

  list.forEach(function (element, index) {

    if (fristLetter === '') {
      // sectionsIndex.push(totalSize);

      fristLetter = element.namepy.slice(0, 1);
      sections.push(fristLetter.toUpperCase());
      item.name = fristLetter;
      item.id = fristLetter;
      item.data.push(element);
      return;
    }

    if (element.namepy.startsWith(fristLetter)) {
      item.data.push(element);
      return;
    }

    result.push(item);
    // totalSize += item.data.length + 1;
    // sectionsIndex.push(totalSize);

    item = {
      name: '',
      id: '',
      data: [],
    };
    fristLetter = element.namepy.slice(0, 1);
    item.name = fristLetter;
    sections.push(fristLetter.toUpperCase());
    item.id = fristLetter;
    item.data.push(element);
  });
  result.push(item);
  // totalSize += item.data.length + 1;
  // sectionsIndex.push(totalSize);

  result.sections = sections;
  // result.sectionsIndex = sectionsIndex;

  return result;
};