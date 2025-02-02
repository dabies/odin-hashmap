class HashMap {
    constructor() {
        //initial variables given by Odin
        let initialCapacity = 16;
        const loadFactor = 0.75;

        //initializing all variables
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        //cool function here. array.from() takes an iterable, in this case the length of our capacity, and does something
        //for that amount of time. in our case, it is returning an empty array, so we will have an array of arrays :D
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = 0;
    }

    //hashing function provided by Odin. Added in a modular that will divide by the bucket capacity, which will
    //help with achieving a more even spread
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
    
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    //function for adding a key, value pair into the hashmap
    set(key, value) {
        //hash the key to determine the index of the bucket it will be going into
        let bucketIndex = this.hash(key);
        //throw an error if that bucket index isn't in the array
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
          }
        
        //if the key is already in our hashmap, we simply update the value and return
        const bucket = this.buckets[bucketIndex];
        for(let entry of bucket) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }
        //add key value pair to our bucket array if it is new, growing the size by one
        bucket.push({ key, value });
        this.size++;

        //check to see if adding this key pushed us past our load capacity. if it did, we must grow our bucket array
        if(this.size/this.capacity > this.loadFactor) {
            this.grow();
        }
    }

    grow() {
        //save old bucket array, grow the capacity, redo the bucket array with new length
        //set size to zero, (it will go back to normal in next step)
        let oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = 0;

        //rehash all old entries into the new buckets
        for (const bucket of oldBuckets) {
            for(const entry of bucket) {
                this.set(entry.key, entry.value);
            }
        }
    }

    //function to return the value associated with a key
    get(key) {
        //variables to determine what bucket the key is in
        let bucketIndex = this.hash(key);
        //throw an error if that bucket index isn't in the array
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
          }
        let bucket = this.buckets[bucketIndex];

        //iterate over every key in that bucket until we find the one we're looking for, and return that value
        //return null if key isn't found
        for(const entry of bucket) {
            if(entry.key === key) {
                return entry.value;
            }
        }
        return null;
    }

    has(key) {
        //this is one of the first times ive actually used a ternary operator in my code
        //evaluate if get(key) doesn't equal null, if it doesn't equal null, then it exists and returns true
        //if it does equal null, it returns false
        return this.get(key) !== null? true: false;
    }
    //function to remove a key from hashmap
    remove(key) {
        //variables to determine what bucket the entry is in, and then what index in that bucket the key is
        let bucketIndex = this.hash(key);
        //throw an error if that bucket index isn't in the array
        if (bucketIndex < 0 || bucketIndex >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
          }
        let bucket = this.buckets[bucketIndex];
        let index = bucket.findIndex((entry) => entry.key === key);

        //find index returns -1 if the key is not found, so it returns false in that case
        if (index === -1) {
            return false;
        } else {
            //if index is found, we splice it out of the array, and decrease the array size by one, returning true
            bucket.splice(index, 1);
            this.size--;
            return true;
        }
    }

    //function to return the amount of keys in the bucket array, which we track with the size variable
    length() {
        return this.size;
    }

    //replaces old bucket array with a new one, which starts back at initial capacity
    //resets size to zero
    clear() {
        this.buckets = Array.from({ length: 16 }, () => []);
        this.size = 0;
    }

    //function to return all keys in array
    //create array of keys, iterate over every key in every bucket, and add it to the array and return it
    keys() {
        let keyArray = [];

        for(let bucket of this.buckets) {
            for (let entry of bucket) {
                keyArray.push(entry.key);
            }
        }
        return keyArray;
    }

    //same as keys(), but with values instead
    values() {
        let valueArray = [];

        for(let bucket of this.buckets) {
            for(let entry of bucket) {
                valueArray.push(entry.value);
            }
        }
        return valueArray;
    }

    //same as keys and values, but instead returning the pair of them together
    entries() {
        let entryArray = [];

        for(let bucket of this.buckets) {
            for(let entry of bucket) {
                entryArray.push([ entry.key, entry.value ]);
            }
        }
        return entryArray;
    }
}

export { HashMap };