Introduction to Graphs:
- A graph is a non-linear data structure consisting of vertices (or nodes) and edges that connect these vertices.
- Graphs can be directed (edges have a direction) or undirected (edges have no direction).
- They can be weighted (edges have associated costs) or unweighted.
- Graphs can represent a wide variety of real-world relationships and networks.

Key Components:
1. Vertices (Nodes): The fundamental units of a graph
2. Edges: Connections between vertices
3. Adjacency: The relationship between directly connected vertices

Common Graph Representations:
1. Adjacency Matrix: A 2D array where `matrix[i][j]` represents an edge between vertex i and j
2. Adjacency List: An array of lists, where each list contains the neighbors of a vertex
3. Edge List: A list of all edges in the graph

Basic Graph Operations:
- Add vertex
- Add edge
- Remove vertex
- Remove edge
- Check if an edge exists between two vertices

Graph Traversal Algorithms:
1. Depth-First Search (DFS)
2. Breadth-First Search (BFS)

Advanced Graph Algorithms:
1. Shortest Path: Dijkstra's, Bellman-Ford
2. Minimum Spanning Tree: Kruskal's, Prim's
3. Topological Sorting
4. Strongly Connected Components: Kosaraju's, Tarjan's

Time Complexities (for adjacency list representation):
- Add Vertex: O(1)
- Add Edge: O(1)
- Remove Vertex: O(|V| + |E|)
- Remove Edge: O(|E|)
- DFS/BFS: O(|V| + |E|)

Real-world applications of Graphs:
1. Social Networks: Representing connections between people
2. Geographic Information Systems: Mapping roads and locations
3. Computer Networks: Modeling network topologies
4. Recommendation Systems: Suggesting products or content
5. Search Engine Indexing: Web page relationships
6. Pathfinding in Games: Character navigation
7. Dependency Resolution: In software package managers
8. Circuit Design: Modeling electronic circuits
9. Scheduling Problems: Task dependencies

Types of Graphs:
1. Simple Graph: No self-loops or multiple edges
2. Multi-Graph: Allows multiple edges between vertices
3. Pseudo Graph: Allows self-loops
4. Connected Graph: All vertices are connected
5. Disconnected Graph: Contains disconnected components
6. Cyclic Graph: Contains at least one cycle
7. Acyclic Graph: Contains no cycles
8. Complete Graph: Every vertex is connected to every other vertex

Advantages of Graphs:
1. Flexible structure for representing complex relationships
2. Efficient for querying relationships between elements
3. Can model a wide variety of real-world scenarios

Challenges with Graphs:
1. Can be memory-intensive for large, dense graphs
2. Some graph problems are computationally expensive (NP-hard)
3. Choosing the right representation and algorithm is crucial for performance

```javascript
class Graph {
  constructor(isDirected = false) {
    this.adjacencyList = {};
    this.isDirected = isDirected;
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1);
    }
    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2);
    }
    this.adjacencyList[vertex1].add(vertex2);
    if (!this.isDirected) {
      this.adjacencyList[vertex2].add(vertex1);
    }
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].delete(vertex2);
    if (!this.isDirected) {
      this.adjacencyList[vertex2].delete(vertex1);
    }
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return;
    }
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  hasEdge(vertex1, vertex2) {
    return (
      this.adjacencyList[vertex1] &&
      this.adjacencyList[vertex1].has(vertex2)
    );
  }

  dfs(startVertex) {
    const result = [];
    const visited = {};

    const dfsHelper = (vertex) => {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      this.adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          return dfsHelper(neighbor);
        }
      });
    }

    dfsHelper(startVertex);
    return result;
  }

  bfs(startVertex) {
    const queue = [startVertex];
    const result = [];
    const visited = {};
    visited[startVertex] = true;

    while (queue.length) {
      let currentVertex = queue.shift();
      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  print() {
    for (let vertex in this.adjacencyList) {
      console.log(vertex + ' -> ' + [...this.adjacencyList[vertex]]);
    }
  }
}
```

Usage

```javascript
// Create a new undirected graph
const graph = new Graph();

// Add vertices
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');

// Add edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');

// Print the graph
console.log("Graph structure:");
graph.print();

// Check if edge exists
console.log("Edge between A and B:", graph.hasEdge('A', 'B')); // true
console.log("Edge between A and D:", graph.hasEdge('A', 'D')); // false

// Perform DFS starting from vertex 'A'
console.log("DFS starting from A:", graph.dfs('A'));

// Perform BFS starting from vertex 'A'
console.log("BFS starting from A:", graph.bfs('A'));

// Remove an edge and a vertex
graph.removeEdge('A', 'C');
graph.removeVertex('D');

console.log("\nAfter removing edge A-C and vertex D:");
graph.print();
```