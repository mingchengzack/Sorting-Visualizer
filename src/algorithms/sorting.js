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
function partition(arr, l, r, pivot) {}

export function quickSort(arr) {}

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
  const n = arr.length;
  mergeSortHelper(arr, 0, n - 1);
}

// heap sort implentation
export function heapSort(arr) {}

// radix sort implentation
export function radixSort(arr) {}

// bucket sort implentation
export function bucketSort(arr) {}
