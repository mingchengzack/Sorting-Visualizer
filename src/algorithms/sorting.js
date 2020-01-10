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
function merge(arr, l, r, m) {
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
    if (L[idxL] < R[idxR]) {
      arr[k++] = L[idxL++];
    } else {
      arr[k++] = R[idxR++];
    }
  }

  // add remaining elements
  while (idxL < n1) {
    arr[k++] = L[idxL++];
  }

  while (idxR < n2) {
    arr[k++] = R[idxR++];
  }
}

function mergeSortHelper(arr, l, r) {
  if (l === r) return;

  const m = l + Math.floor((r - l) / 2);
  mergeSortHelper(arr, l, m);
  mergeSortHelper(arr, m + 1, r);
  merge(arr, l, r, m);
}

export function mergeSort(arr) {
  mergeSortHelper(arr, 0, arr.length - 1);
}

// heap sort implentation
export function heapSort(arr) {}

// radix sort implentation
export function radixSort(arr) {}

// bucket sort implentation
export function bucketSort(arr) {}
