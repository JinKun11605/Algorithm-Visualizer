const merge = (arr, l, m, r) =>{
    const n1 = m - l + 1;
    const n2 = r - m;

    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    for (let i = 0; i < n1; i++) {
        leftArr[i] = arr[l + i];
    }
    for (let i = 0; i < n2; i++) {
        rightArr[i] = arr[m + 1 + i];
    }

    let i = 0,
        j = 0;
    let k = l;
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }


    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

const mergeSort = (arr, l, r) => {
    if (l < r) {
        const m = Math.floor((l + r) / 2);

        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        merge(arr, l, m, r);
    }
}

const arr = [5, 3, 8, 4, 2];
console.log("Mảng ban đầu:", arr);

mergeSort(arr, 0, arr.length - 1);

console.log("Mảng sau khi sắp xếp:", arr);
