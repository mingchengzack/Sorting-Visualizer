// bubble sort implentation
export function bubbleSort(arr) {
  const n = arr.length;

  // bubble the maximum to the end
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

// insertion sort implentation
export function insertionSort(arr) {
  const n = arr.length;

  // insert every element
  for (let i = 1; i < n; i++) {
    let j;
    let temp = arr[i];

    // find the spot to insert in sorted array
    for (j = i; j > 0 && arr[j - 1] > temp; j--) {
      arr[j] = arr[j - 1];
    }

    arr[j] = temp;
  }
}

// quick sort implentation
function getRandomPivot(l, r) {
  return l + Math.floor(Math.random() * (r - l + 1));
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, l, r, pivot) {
  let partitionIdx = l - 1;
  const pivotElement = arr[pivot];
  swap(arr, r, pivot); // swap pivot with right most elemtn;

  for (let i = l; i < r; i++) {
    if (arr[i] <= pivotElement) swap(arr, i, ++partitionIdx);
  }

  swap(arr, r, ++partitionIdx); // swap pivot back
  return partitionIdx;
}

function quickSortHelper(arr, l, r) {
  if (l >= r) return;
  const pivot = getRandomPivot(l, r);
  const partitionIdx = partition(arr, l, r, pivot);

  quickSortHelper(arr, l, partitionIdx - 1);
  quickSortHelper(arr, partitionIdx + 1, r);
}

export function quickSort(arr) {
  quickSortHelper(arr, 0, arr.length - 1);
}

// merge sort implentation
function merge(arr, l, r, m, animations) {
  const n1 = m - l + 1;
  const n2 = r - m;
  const L = new Array(n1);
  const R = new Array(n2);

  // copy left array
  for (let i = 0; i < n1; i++) {
    L[i] = arr[i + l];
  }

  // copy right array
  for (let i = 0; i < n2; i++) {
    R[i] = arr[i + m + 1];
  }

  let k = l;
  let idxL = 0; // index for left array
  let idxR = 0; // index for right array

  // merge two arrays
  while (idxL < n1 && idxR < n2) {
    animations.push([idxL + l, idxR + m + 1]); // comparing elements at i ,j in the orignal array
    animations.push([idxL + l, idxR + m + 1]); // comparing elements at i ,j in the orignal array
    animations.push([idxL + l, idxR + m + 1]); // comparing elements at i ,j in the orignal array

    if (L[idxL] < R[idxR]) {
      animations.push([k, L[idxL]]); // replace element at k of the original array with L[idxL]
      arr[k++] = L[idxL++];
    } else {
      animations.push([k, R[idxR]]); // replace element at k of the original array with R[idxR];
      arr[k++] = R[idxR++];
    }
  }

  // add remaining elements
  while (idxL < n1) {
    animations.push([idxL + l, idxL + l]);
    animations.push([idxL + l, idxL + l]);
    animations.push([idxL + l, idxL + l]);
    animations.push([k, L[idxL]]); // replace element at k of the original array with L[idxL]
    arr[k++] = L[idxL++];
  }

  while (idxR < n2) {
    animations.push([idxR + m + 1, idxR + m + 1]);
    animations.push([idxR + m + 1, idxR + m + 1]);
    animations.push([idxR + m + 1, idxR + m + 1]);
    animations.push([k, R[idxR]]); // replace element at k of the original array with R[idxR];
    arr[k++] = R[idxR++];
  }
}

function mergeSortHelper(arr, l, r, animations) {
  if (l === r) return;

  const m = l + Math.floor((r - l) / 2);
  mergeSortHelper(arr, l, m, animations);
  mergeSortHelper(arr, m + 1, r, animations);
  merge(arr, l, r, m, animations);
}

export function mergeSort(arr) {
  let animations = [];
  mergeSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

// heap sort implentation
export function heapSort(arr) {}

// radix sort implentation
export function radixSort(arr) {}

// bucket sort implentation
export function bucketSort(arr) {}
