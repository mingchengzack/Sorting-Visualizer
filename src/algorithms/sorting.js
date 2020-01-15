function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// bubble sort implentation
export function bubbleSort(arr) {
  const n = arr.length;
  let animations = [];

  // bubble the maximum to the end
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // for comparing animation
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        // swap
        animations.push([j, j + 1, arr[j], arr[j + 1], j + 1 === n - i - 1]); // for swapping animation
        swap(arr, j, j + 1);
      } else {
        animations.push([j, j + 1, arr[j + 1], arr[j], j + 1 === n - i - 1]); // not swapping
      }
    }
  }

  // final animation
  animations.push([0, 0]);
  animations.push([0, 0]);
  animations.push([0, 0]);
  animations.push([0, 0, arr[0], arr[0], true]);

  return animations;
}

// insertion sort implentation
export function insertionSort(arr) {
  const n = arr.length;
  let animations = [];

  // insert every element
  for (let i = 1; i < n; i++) {
    let j;
    let temp = arr[i];

    // find the spot to insert in sorted array
    for (j = i; j > 0 && arr[j - 1] > temp; j--) {
      // for comparing animation
      animations.push(j);
      animations.push(j);
      animations.push(j);

      // for overwriting animation
      animations.push([j, arr[j - 1], i === n - 1]);
      arr[j] = arr[j - 1];
    }

    // for comparing animation
    animations.push(j);
    animations.push(j);
    animations.push(j);

    // for overwriting animation
    animations.push([j, temp, i === n - 1]);

    arr[j] = temp;

    // sorted animations
    for (let k = j - 1; k >= 0; k--) {
      // for comparing animation
      animations.push(k);
      animations.push(k);
      animations.push(k);

      // for overwriting animation
      animations.push([k, arr[k], i === n - 1]);
    }
  }

  return animations;
}

// quick sort implentation
function getRandomPivot(l, r) {
  return l + Math.floor(Math.random() * (r - l + 1));
}

function partition(arr, l, r, pivot, animations) {
  let partitionIdx = l - 1;
  const pivotElement = arr[pivot];

  animations.push([r, pivot]);
  animations.push([r, pivot]);
  animations.push([r, pivot]);
  animations.push([r, pivot, arr[r], arr[pivot], 2]);
  swap(arr, r, pivot); // swap pivot with right most elemtn;

  for (let i = l; i < r; i++) {
    animations.push([i, partitionIdx + 1]);
    animations.push([i, partitionIdx + 1]);
    animations.push([i, partitionIdx + 1]);

    if (arr[i] <= pivotElement) {
      animations.push([i, partitionIdx + 1, arr[i], arr[partitionIdx + 1], 3]);
      swap(arr, i, ++partitionIdx);
    } else {
      animations.push([i, partitionIdx + 1, arr[partitionIdx + 1], arr[i], 3]);
    }
  }

  animations.push([r, partitionIdx + 1]);
  animations.push([r, partitionIdx + 1]);
  animations.push([r, partitionIdx + 1]);
  animations.push([r, partitionIdx + 1, arr[r], arr[partitionIdx + 1], 1]);
  swap(arr, r, ++partitionIdx); // swap pivot back
  return partitionIdx;
}

function quickSortHelper(arr, l, r, animations) {
  if (l > r) return;
  const pivot = getRandomPivot(l, r);
  const partitionIdx = partition(arr, l, r, pivot, animations);

  quickSortHelper(arr, partitionIdx + 1, r, animations);
  quickSortHelper(arr, l, partitionIdx - 1, animations);
}

export function quickSort(arr) {
  let animations = [];
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
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
  const isSorted = l === 0 && r === arr.length - 1;

  // merge two arrays
  while (idxL < n1 && idxR < n2) {
    animations.push([idxL + l, idxR + m + 1]); // comparing elements at i ,j in the orignal array
    animations.push([idxL + l, idxR + m + 1]); // comparing elements at i ,j in the orignal array
    animations.push([idxL + l, idxR + m + 1]); // comparing elements at i ,j in the orignal array

    if (L[idxL] < R[idxR]) {
      animations.push([k, L[idxL], isSorted, idxL + l]); // replace element at k of the original array with L[idxL]
      arr[k++] = L[idxL++];
    } else {
      animations.push([k, R[idxR], false, k]); // replace element at k of the original array with R[idxR];
      arr[k++] = R[idxR++];
    }
  }

  // add remaining elements
  while (idxL < n1) {
    animations.push([idxL + l, idxL + l]);
    animations.push([idxL + l, idxL + l]);
    animations.push([idxL + l, idxL + l]);
    animations.push([k, L[idxL], isSorted, idxL + l]); // replace element at k of the original array with L[idxL]
    arr[k++] = L[idxL++];
  }

  while (idxR < n2) {
    animations.push([idxR + m + 1, idxR + m + 1]);
    animations.push([idxR + m + 1, idxR + m + 1]);
    animations.push([idxR + m + 1, idxR + m + 1]);
    animations.push([k, R[idxR], false, k]); // replace element at k of the original array with R[idxR];
    arr[k++] = R[idxR++];
  }

  // sorted animations
  if (isSorted) {
    for (let i = idxL + l; i <= r; i++) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([i, arr[i], isSorted, i]);
    }
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
function heapify(arr, n, i, animations) {
  if (n === 0) return;
  let largestIdx = i;
  let l = 2 * i + 1; // left child
  let r = 2 * i + 2; // right child

  if (l < n && arr[l] > arr[largestIdx]) largestIdx = l; // heapify left child
  if (r < n && arr[r] > arr[largestIdx]) largestIdx = r; // heapify right child

  animations.push([i, largestIdx]);
  animations.push([i, largestIdx]);
  animations.push([i, largestIdx]);
  // if more heapify needed
  if (largestIdx !== i) {
    // swap
    animations.push([i, largestIdx, arr[i], arr[largestIdx], false]);
    swap(arr, i, largestIdx);

    // heapify affectd subtrees
    heapify(arr, n, largestIdx, animations);
  } else {
    animations.push([i, largestIdx, arr[largestIdx], arr[i], false]);
  }
}

export function heapSort(arr) {
  const n = arr.length;
  let animations = [];

  // build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i, animations);

  // extract sorted element
  for (let i = n - 1; i >= 0; i--) {
    // swap to the end
    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([0, i, arr[0], arr[i], true]);
    swap(arr, 0, i);

    // call max heapify on the reduced heap
    heapify(arr, i, 0, animations);
  }

  return animations;
}

// radix sort implentation
export function radixSort(arr) {}

// bucket sort implentation
export function bucketSort(arr) {}
