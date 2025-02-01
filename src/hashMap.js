import { Node, LinkedList } from './linkedList'

class HashMap {
    constructor(initialCapacity = 16; loadFactor = 0.75) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.buckets = Array.from ({ length: this.capacity }, () => []);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
    
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        let bucketIndex = this.hash(key);
        if (bucketIndex < 0 || bucketIndex >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
          }
        
        const bucket = this.buckets[bucketIndex];
        for(let entry of bucket) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }

        bucket.push({ key, value });
        this.size++;

        if(this.size/this.capacity >= this.loadFactor) {
            this.grow();
        }
    }

    grow() {
        //save old bucket array, grow the capacity, redo the bucket array with new length
        //set size to zero, (it will go back to normal in next step)
        let oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array.from({ length: this.capacity } () => []);
        this.size = 0;

        //rehash all old entries into the new buckets
        for (const bucket of oldBuckets) {
            for(const entry of bucket) {
                this.set(entry.key, entry.value);
            }
        }
    }

    get(key) {
        let bucketIndex = this.hash(key);
        let bucket = this.buckets[bucketIndex];

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

    remove(key) {
        let bucketIndex = this.hash(key);
        let bucket = this.buckets[bucketIndex];

        if(entry) {
            this.buckets[bucketIndex].
            return true;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {

    }

    keys() {

    }

    values() {

    }

    entries() {

    }
}

export { HashMap };